import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { taskStore } from '../storage/taskStore.js';
import { printTable, truncate } from '../utils/table.js';

export function registerTaskCommands(program: Command): void {
  const task = program.command('task').description('Gérer vos tâches');

  task
    .command('add <title>')
    .description('Ajouter une tâche')
    .option('-p, --priority <level>', 'Priorité (Haute/Moyenne/Basse)', 'Moyenne')
    .action((title: string, opts: { priority: string }) => {
      taskStore.add(title, opts.priority as any);
      logger.success(`Tâche "${title}" ajoutée !`);
    });

  task
    .command('list')
    .description('Lister toutes les tâches')
    .action(() => {
      const tasks = taskStore.list();
      if (tasks.length === 0) return logger.info('Aucune tâche.');

      const rows = tasks.map((t, i) => [
        String(i + 1),
        t.done ? '✅' : '⬜',
        truncate(t.title, 50),
        t.priority,
      ]);

      logger.title(`${tasks.length} tâche(s)`);
      printTable(['#', 'Statut', 'Titre', 'Priorité'], rows, {
        colWidths: [4, 8, 52, 12],
      });
    });

  task
    .command('done <index>')
    .description('Cocher une tâche comme terminée')
    .action((index: string) => {
      const ok = taskStore.toggle(parseInt(index) - 1);
      if (!ok) return logger.error(`Tâche ${index} introuvable`);
      logger.success(`Tâche ${index} mise à jour`);
    });

  task
    .command('remove <index>')
    .description('Supprimer une tâche')
    .action((index: string) => {
      const ok = taskStore.remove(parseInt(index) - 1);
      if (!ok) return logger.error(`Tâche ${index} introuvable`);
      logger.success(`Tâche ${index} supprimée`);
    });
}