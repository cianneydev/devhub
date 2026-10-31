import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { projectStore } from '../storage/projectStore.js';
import { printTable, truncate } from '../utils/table.js';

export function registerProjectCommands(program: Command): void {
  const project = program.command('project').description('Gérer vos projets');

  project
    .command('add <name> [description]')
    .description('Ajouter un projet')
    .action((name: string, description: string = '') => {
      const ok = projectStore.add(name, description);
      if (!ok) return logger.warn(`Le projet "${name}" existe déjà`);
      logger.success(`Projet "${name}" ajouté !`);
      logger.info(`📁 ${projectStore.getStorePath()}`);
    });

  project
    .command('list')
    .description('Lister tous les projets')
    .action(() => {
      const projects = projectStore.list();
      if (projects.length === 0) return logger.info('Aucun projet.');

      const rows = projects.map((p, i) => [
        String(i + 1),
        p.name,
        truncate(p.description || '—', 40),
        new Date(p.createdAt).toLocaleDateString(),
      ]);

      logger.title(`${projects.length} projet(s)`);
      printTable(['#', 'Nom', 'Description', 'Date'], rows, {
        colWidths: [4, 20, 42, 12],
      });
    });

  project
    .command('show <name>')
    .description('Afficher un projet')
    .action((name: string) => {
      const p = projectStore.get(name);
      if (!p) return logger.error(`Projet "${name}" introuvable`);
      logger.title(p.name);
      console.log(p.description || '(pas de description)');
      console.log(`\n📅 Créé le : ${new Date(p.createdAt).toLocaleString()}`);
    });

  project
    .command('remove <name>')
    .description('Supprimer un projet')
    .action((name: string) => {
      const ok = projectStore.remove(name);
      if (!ok) return logger.error(`Projet "${name}" introuvable`);
      logger.success(`Projet "${name}" supprimé`);
    });
}