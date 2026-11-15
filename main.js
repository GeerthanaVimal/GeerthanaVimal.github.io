/* 
   Portfolio behaviour
   Each page is its own HTML file. This script only sets the
   footer year and builds the Skills cards (skills.html).
*/

/* Footer year */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* SKILLS */
const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
const SI  = 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/';

const SKILLS = [
  { title: 'Programming languages', items: [
    { n: 'C',            dev: 'c/c-original' },
    { n: 'C++',          dev: 'cplusplus/cplusplus-original' },
    { n: 'C#',           dev: 'csharp/csharp-original' },
    { n: 'Python',       dev: 'python/python-original' },
    { n: 'R',            dev: 'r/r-original' },
    { n: 'SQL',          dev: 'mysql/mysql-original' },
    { n: 'MATLAB',       dev: 'matlab/matlab-original' },
    { n: 'HTML',         dev: 'html5/html5-original' },
    { n: 'CSS',          dev: 'css3/css3-original' },
    { n: 'JavaScript',   dev: 'javascript/javascript-original' },
  ]},
  { title: 'Development tools', items: [
    { n: 'Visual Studio', dev: 'visualstudio/visualstudio-plain' },
    { n: 'VS Code',       dev: 'vscode/vscode-original' },
    { n: 'Notepad++',     si: 'notepadplusplus' },
    { n: 'Anaconda',      dev: 'anaconda/anaconda-original' },
    { n: 'Google Colab',  dev: 'googlecolab/googlecolab-original' },
    { n: 'Git',           dev: 'git/git-original' },
  ]},
  { title: 'AI, machine learning & deployment', items: [
    { n: 'OpenCV',       dev: 'opencv/opencv-original' },
    { n: 'TensorFlow',   dev: 'tensorflow/tensorflow-original' },
    { n: 'PyTorch',      dev: 'pytorch/pytorch-original' },
    { n: 'YOLO Models' },
    { n: 'NVIDIA',       si: 'nvidia' },
    { n: 'Hugging Face', si: 'huggingface' },
    { n: 'LangChain',    si: 'langchain' },
    { n: 'FastAPI',      dev: 'fastapi/fastapi-original' },
    { n: 'AWS',          dev: 'amazonwebservices/amazonwebservices-original-wordmark' },
  ]},
  { title: 'Electronics, embedded & automation', items: [
    { n: 'Arduino',      dev: 'arduino/arduino-original' },
    { n: 'Raspberry Pi', dev: 'raspberrypi/raspberrypi-original' },
    { n: 'Proteus' },
    { n: 'KiCad (PCB)',  si: 'kicad' },
    { n: 'PLC',          fa: 'fa-solid fa-microchip', color: '#5b6b79' },
  ]},
  { title: 'CAD & 3D printing', items: [
    { n: 'SolidWorks',   dev: 'solidworks/solidworks-original' },
    { n: 'AutoCAD',      si: 'autocad' },
    { n: 'Solid Edge' },
    ,
  ]},
  { title: 'Research & office tools', items: [
    { n: 'Word',       fa: 'fa-solid fa-file-word',       color: '#2b579a' },
    { n: 'PowerPoint', fa: 'fa-solid fa-file-powerpoint', color: '#d24726' },
    { n: 'Excel',      fa: 'fa-solid fa-file-excel',      color: '#217346' },
    { n: 'MS Project', fa: 'fa-solid fa-diagram-project', color: '#31752f' },
  ]},
];

const EXPERTISE = ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision',
                   'Generative AI', 'Web Development', 'Robotics', 'Embedded Systems',
                   'PCB Design', 'CAD / 3D Design', 'Research & Documentation'];

const slug = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');

function badge(name) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 360;
  const b = document.createElement('div');
  b.className = 'skill-badge';
  b.style.background = `hsl(${h} 55% 45%)`;
  b.textContent = name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  b.setAttribute('aria-hidden', 'true');
  return b;
}

function skillCard(item) {
  const card = document.createElement('div');
  card.className = 'skill-card';

  if (item.fa) {                       // Font Awesome icon instead of an image
    const icon = document.createElement('i');
    icon.className = 'skill-fa ' + item.fa;
    if (item.color) icon.style.color = item.color;
    icon.setAttribute('aria-hidden', 'true');
    const lbl = document.createElement('span');
    lbl.textContent = item.n;
    card.append(icon, lbl);
    return card;
  }

  const sources = [];
  if (item.dev) sources.push(`${DEV}${item.dev}.svg`);
  if (item.si)  sources.push(`${SI}${item.si}.svg`);
  sources.push(`assets/img/skills/${slug(item.n)}.png`);

  const img = new Image();
  img.alt = '';
  img.loading = 'lazy';
  let i = 0;
  img.onerror = () => {
    i += 1;
    if (i < sources.length) img.src = sources[i];
    else img.replaceWith(badge(item.n));
  };
  img.src = sources[0];

  const label = document.createElement('span');
  label.textContent = item.n;
  card.append(img, label);
  return card;
}

const root = document.getElementById('skills-root');
if (root) SKILLS.forEach(group => {
  const wrap = document.createElement('div');
  wrap.className = 'skill-group';
  wrap.innerHTML = `<h3>${group.title}</h3>`;
  const grid = document.createElement('div');
  grid.className = 'skill-grid';
  group.items.forEach(it => grid.appendChild(skillCard(it)));
  wrap.appendChild(grid);
  root.appendChild(wrap);
});

if (root) {
const ex = document.createElement('div');
ex.className = 'skill-group';
ex.innerHTML = '<h3>Areas of expertise</h3><div class="chips">' +
  EXPERTISE.map(e => `<span>${e}</span>`).join('') + '</div>';
root.appendChild(ex);
}
