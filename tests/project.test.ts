import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const TEST_DIR = path.join(os.tmpdir(), `devhub-project-${Date.now()}`);

describe('projectStore', () => {
  let projectStore: typeof import('../src/storage/projectStore.js').projectStore;

  beforeEach(async () => {
    process.env.DEVHUB_DIR = TEST_DIR;
    fs.mkdirSync(TEST_DIR, { recursive: true });
    vi.resetModules();
    const mod = await import('../src/storage/projectStore.js');
    projectStore = mod.projectStore;
  });

  afterEach(() => {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    delete process.env.DEVHUB_DIR;
  });

  it('démarre vide', () => expect(projectStore.count()).toBe(0));

  it('ajoute un projet', () => {
    expect(projectStore.add('site', 'Mon portfolio')).toBe(true);
    expect(projectStore.count()).toBe(1);
  });

  it('refuse les doublons', () => {
    projectStore.add('p', 'A');
    expect(projectStore.add('p', 'B')).toBe(false);
    expect(projectStore.count()).toBe(1);
  });

  it('get retourne le projet', () => {
    projectStore.add('test', 'desc');
    expect(projectStore.get('test')?.description).toBe('desc');
  });

  it('supprime un projet', () => {
    projectStore.add('temp', '');
    expect(projectStore.remove('temp')).toBe(true);
    expect(projectStore.count()).toBe(0);
  });

  it('retourne false si introuvable', () => {
    expect(projectStore.remove('inexistant')).toBe(false);
  });
});