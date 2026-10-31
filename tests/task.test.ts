import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-task-${Date.now()}`);

describe('taskStore', () => {
  let taskStore: typeof import('../src/storage/taskStore.js').taskStore;

  beforeEach(async () => {
    process.env.DEVHUB_DIR = TEST_DIR;
    fs.mkdirSync(TEST_DIR, { recursive: true });
    vi.resetModules();
    const mod = await import('../src/storage/taskStore.js');
    taskStore = mod.taskStore;
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    delete process.env.DEVHUB_DIR;
  });

  it('démarre vide', () => expect(taskStore.count()).toBe(0));

  it('ajoute une tâche', () => {
    taskStore.add('Faire X', 'Haute');
    expect(taskStore.count()).toBe(1);
  });

  it('coche une tâche', () => {
    taskStore.add('T1');
    taskStore.toggle(0);
    expect(taskStore.list()[0].done).toBe(true);
  });

  it('supprime une tâche', () => {
    taskStore.add('T1');
    expect(taskStore.remove(0)).toBe(true);
    expect(taskStore.count()).toBe(0);
  });

  it('retourne false si index invalide', () => {
    expect(taskStore.remove(99)).toBe(false);
  });
});