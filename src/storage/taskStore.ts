import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface Task {
  title: string;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  done: boolean;
  createdAt: string;
}

interface StoreData {
  tasks: Task[];
}

const DEVHUB_DIR = process.env.DEVHUB_DIR || path.join(os.homedir(), '.devhub');
const STORE_FILE = path.join(DEVHUB_DIR, 'tasks.json');

function ensureDir(): void {
  if (!fs.existsSync(DEVHUB_DIR)) fs.mkdirSync(DEVHUB_DIR, { recursive: true });
}

function readStore(): StoreData {
  ensureDir();
  if (!fs.existsSync(STORE_FILE)) return { tasks: [] };
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8')) as StoreData;
  } catch {
    return { tasks: [] };
  }
}

function writeStore(data: StoreData): void {
  ensureDir();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const taskStore = {
  list(): Task[] {
    return readStore().tasks;
  },
  add(title: string, priority: 'Haute' | 'Moyenne' | 'Basse' = 'Moyenne'): boolean {
    const data = readStore();
    data.tasks.push({ title, priority, done: false, createdAt: new Date().toISOString() });
    writeStore(data);
    return true;
  },
  toggle(index: number): boolean {
    const data = readStore();
    if (index < 0 || index >= data.tasks.length) return false;
    data.tasks[index].done = !data.tasks[index].done;
    writeStore(data);
    return true;
  },
  remove(index: number): boolean {
    const data = readStore();
    if (index < 0 || index >= data.tasks.length) return false;
    data.tasks.splice(index, 1);
    writeStore(data);
    return true;
  },
  count(): number {
    return readStore().tasks.length;
  },
  getStorePath(): string {
    return STORE_FILE;
  },
};