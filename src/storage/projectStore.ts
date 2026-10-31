import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface Project {
  name: string;
  description: string;
  createdAt: string;
}

interface StoreData {
  projects: Project[];
}

const DEVHUB_DIR = process.env.DEVHUB_DIR || path.join(os.homedir(), '.devhub');
const STORE_FILE = path.join(DEVHUB_DIR, 'projects.json');

function ensureDir(): void {
  if (!fs.existsSync(DEVHUB_DIR)) fs.mkdirSync(DEVHUB_DIR, { recursive: true });
}

function readStore(): StoreData {
  ensureDir();
  if (!fs.existsSync(STORE_FILE)) return { projects: [] };
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8')) as StoreData;
  } catch {
    return { projects: [] };
  }
}

function writeStore(data: StoreData): void {
  ensureDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const projectStore = {
  list(): Project[] {
    return readStore().projects;
  },
  add(name: string, description: string): boolean {
    const data = readStore();
    if (data.projects.find((p) => p.name === name)) return false;
    data.projects.push({ name, description, createdAt: new Date().toISOString() });
    writeStore(data);
    return true;
  },
  remove(name: string): boolean {
    const data = readStore();
    const index = data.projects.findIndex((p) => p.name === name);
    if (index === -1) return false;
    data.projects.splice(index, 1);
    writeStore(data);
    return true;
  },
  get(name: string): Project | null {
    return readStore().projects.find((p) => p.name === name) ?? null;
  },
  count(): number {
    return readStore().projects.length;
  },
  getStorePath(): string {
    return STORE_FILE;
  },
};