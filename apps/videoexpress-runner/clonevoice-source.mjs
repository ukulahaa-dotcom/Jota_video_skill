import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {audioLines} from './production-presets.mjs';

const origin = 'https://app.clonevoice.ai';
const defaults = {
  // Narator default owner 2026-11-26: Gilang Perkasa (System, Indonesian); suara clone narator lama kadang kurang jelas.
  // Suara clone pribadi owner (mis. ABA) TIDAK ditulis di repo: isi local-state/clonevoice-voices.json di mesin masing-masing.
  NARATOR: {name: 'Gilang Perkasa', sourceLanguage: 'Indonesian', category: 'System'},
  // Katalog akun 2026-11-26 (jota.mjs voices): umair 2, saheela (Indonesian, Cloned).
  UMAIR: {name: 'umair 2', sourceLanguage: 'Indonesian'},
  SAHEELA: {name: 'saheela', sourceLanguage: 'Indonesian'},
};

export function cloneVoiceFor(data, character, state) {
  const selected=state && character==='NARATOR' && path.join(state,'clonevoice-narrator.json');
  const saved=selected && fs.existsSync(selected) ? JSON.parse(fs.readFileSync(selected,'utf8')) : null;
  const mapping=state && path.join(state,'clonevoice-voices.json');
  const voices=mapping && fs.existsSync(mapping) ? JSON.parse(fs.readFileSync(mapping,'utf8')) : {};
  const voice = data.clonevoice_voices?.[character] ?? saved ?? voices[character] ?? defaults[character];
  if (!voice?.name?.trim() || !voice?.sourceLanguage?.trim()) {
    throw Error('CLONEVOICE_VOICE_MISSING: ' + character + '; isi clonevoice_voices dengan name dan sourceLanguage');
  }
  const category = voice.category ?? 'Cloned';
  if (!['Cloned','Designed','System','Public Library'].includes(category)) {
    throw Error('CLONEVOICE_CATEGORY_INVALID: ' + character);
  }
  return {name: voice.name.trim(), sourceLanguage: voice.sourceLanguage.trim(), category};
}

export function validateCloneAudio(data,state) {
  if (data.final === 'finalcut') throw Error('CLONEVOICE_REQUIRES_LOCAL_ASSEMBLY');
  for (const shot of data.shots) {
    if (shot.suara_untuk) throw Error('CLONEVOICE_NATIVE_AUDIO_ONLY: ' + shot.id + '; pindahkan teks dan voice ke dialog shot visual');
    const lines=audioLines(data,shot);
    if(data.audio_policy==='reviewed_vx_sfx' && !shot.suara_latar && !shot.foley?.length) throw Error('CLONEVOICE_SFX_CUE_REQUIRED: '+shot.id);
    if(shot.suara_native && !lines.length) throw Error('CLONEVOICE_SCRIPT_MISSING: '+shot.id);
    if((shot.suara_latar||shot.foley?.length)&&process.env.JOTA_TANPA_LATAR)throw Error('CLONEVOICE_SFX_REQUIRED: '+shot.id);
    for (const line of lines) {
      if(!String(line.text||'').replace(/\[[^\]]*\]/g,'').trim())throw Error('CLONEVOICE_SCRIPT_EMPTY: '+shot.id);
      cloneVoiceFor(data,String(line.voice || 'NARATOR').toUpperCase(),state);
    }
  }
}

export function cloneCueKey(project, request) {
  return createHash('sha256').update(JSON.stringify([project,request])).digest('hex');
}

export async function openClonePage(openBrowser) {
  const {ctx}=await openBrowser();
  try {
    const page=await ctx.newPage();
    page.setDefaultTimeout(10000);
    return {page,close:()=>ctx.close()};
  } catch(error) {
    await ctx.close();
    throw error;
  }
}

async function visit(page, route) {
  await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:25000});
  const url=new URL(page.url());
  if (url.origin!==origin || url.pathname==='/login') throw Error('CLONEVOICE_SESSION_REQUIRED: masuk melalui Chrome Worker Runner');
  await page.locator('main').waitFor();
}

export async function listCloneVoices(page) {
  await visit(page,'/voice');
  await page.getByText('My Voices',{exact:true}).last().waitFor();
  await page.getByRole('button',{name:'Cloned Voices',exact:true}).click();
  return page.getByRole('button',{name:/^Play voice /i}).evaluateAll(buttons=>buttons.flatMap(button=>{
    const name=button.getAttribute('aria-label').replace(/^Play voice /i,'');
    for(let el=button;el && el.tagName!=='MAIN';el=el.parentElement){
      const lines=el.innerText.split('\n').map(text=>text.trim()).filter(Boolean);
      const language=lines.indexOf('Language');
      const status=lines.indexOf('Status');
      if(language>=0 && status>=0)return lines[status+1]==='Completed'?[{name,sourceLanguage:lines[language+1],category:'Cloned'}]:[];
    }
    return [];
  }));
}

async function asset(page, title) {
  await visit(page,'/audio');
  const item=page.getByText(title,{exact:true});
  await item.first().waitFor({timeout:2500}).catch(error=>{if(error.name!=='TimeoutError')throw error;});
  const count=await item.count();
  if(count>1)throw Error('CLONEVOICE_DUPLICATE_ASSET: '+title);
  if(!count)return null;
  return item.evaluate(el=>{
    for(let node=el;node && node.tagName!=='MAIN';node=node.parentElement) {
      const lines=node.innerText.split('\n').map(s=>s.trim()).filter(Boolean);
      const i=lines.indexOf('Status');
      if(i>=0)return lines[i+1]||'Unknown';
    }
    return 'Unknown';
  });
}

export async function downloadCloneAudio(page, title, out) {
  const stage=await asset(page,title);
  if(stage!=='Completed') throw Error('CLONEVOICE_ASSET_NOT_COMPLETED: '+title+' ('+stage+')');
  await saveDownload(page,title,out);
}

async function saveDownload(page,title,out) {
  const [download]=await Promise.all([
    page.waitForEvent('download',{timeout:25000}),
    page.getByRole('button',{name:'Download '+title,exact:true}).click()
  ]);
  const temp=out+'.partial';
  try {
    await download.saveAs(temp);
    execFileSync('ffmpeg',['-v','error','-xerror','-i',temp,'-map','0:a:0','-f','null','-'],{stdio:'ignore',timeout:45000});
    fs.renameSync(temp,out);
  } finally {fs.rmSync(temp,{force:true});}
}

function exactText(value) {
  return new RegExp('^'+value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i');
}

async function submit(page, title, cue, mark) {
  if (cue.kind==='speech') {
    await visit(page,'/audio/create');
    const main=page.locator('main');
    const selectLanguage=async (i,name)=>{
      await main.getByRole('combobox').nth(i).click();
      await page.getByRole('option',{name:exactText(name)}).click();
    };
    if(cue.voice.sourceLanguage!=='English')await selectLanguage(0,cue.voice.sourceLanguage);
    await main.getByRole('button',{name:'Select Voice',exact:true}).click();
    const search=page.getByPlaceholder('Search voices...');
    const picker=page.locator('[role=dialog]').filter({has:search});
    await picker.locator('select').filter({has:page.locator('option').filter({hasText:/^Cloned$/})}).selectOption({label:cue.voice.category});
    await search.fill(cue.voice.name);
    const voice=picker.getByRole('button',{name:exactText('Select voice '+cue.voice.name)});
    await voice.click();
    await search.waitFor({state:'hidden'});
    if(cue.voice.sourceLanguage!=='Indonesian')await selectLanguage(1,'Indonesian');
    await main.getByPlaceholder('Audio Name',{exact:true}).fill(title);
    await main.getByPlaceholder('Enter your script...',{exact:true}).fill(cue.text);
    if(!await main.getByRole('checkbox',{name:'Agree to terms of service'}).isChecked()) throw Error('CLONEVOICE_TERMS_REQUIRED');
    await main.getByRole('button',{name:'Create New Audio',exact:true}).click();
    const generate=page.getByRole('button',{name:'Generate Audio',exact:true});
    await generate.waitFor();
    mark();
    await generate.click();
  } else {
    await visit(page,'/design-sound/create');
    const main=page.locator('main');
    await main.getByRole('button',{name:'Non Instrumental',exact:true}).click();
    await main.getByPlaceholder('Example: Epic Battle Music',{exact:true}).fill(title);
    await main.getByPlaceholder(/^Example: Epic orchestral battle music/).fill(cue.text);
    const generate=main.getByRole('button',{name:'Generate Sound',exact:true});
    await generate.waitFor();
    mark();
    await generate.click();
  }
  await page.waitForURL(url=>url.pathname==='/audio',{timeout:18000}).catch(error=>{
    if(error.name!=='TimeoutError')throw error;
  });
}

export function cloneAudioSource({data, shotsFile, openBrowser}) {
  const dir=path.join(path.dirname(shotsFile),'clonevoice-audio');
  let session;
  return {
    async render(cue) {
      const key=cloneCueKey(data.project,cue);
      const title='JOTA '+key.slice(0,28);
      const out=path.join(dir,key+'.audio');
      const receipt=path.join(dir,key+'.submitted');
      fs.mkdirSync(dir,{recursive:true});
      if(fs.existsSync(out))return fs.readFileSync(out);
      session??=await openClonePage(openBrowser);
      const {page}=session;
      let stage=await asset(page,title);
      if(!stage&&!fs.existsSync(receipt)){
        await submit(page,title,cue,()=>fs.writeFileSync(receipt,title+'\n',{flag:'wx'}));
      }
      const deadline=Date.now()+180000;
      while(stage!=='Completed'&&Date.now()<deadline){
        if(/failed|error|cancelled/i.test(stage||''))throw Error('CLONEVOICE_RENDER_FAILED: '+title+' ('+stage+')');
        await new Promise(resolve=>setTimeout(resolve,6000));
        stage=await asset(page,title);
      }
      if(stage!=='Completed')throw Error('CLONEVOICE_PENDING: '+title+' ('+(stage||'belum tampak')+'); cek My Audios sebelum mengulang');
      await saveDownload(page,title,out);
      return fs.readFileSync(out);
    },
    async close(){if(session)await session.close();}
  };
}
