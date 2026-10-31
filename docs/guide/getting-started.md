# 🚀 Démarrage rapide

Bienvenue dans **DevHub** ! Ce guide vous montre comment l'installer et l'utiliser en 2 minutes.

## 💻 Qu'est-ce qu'un CLI ?

Un **CLI** (Command Line Interface) est une interface qui permet d'interagir avec un programme en tapant des commandes textuelles dans un terminal, plutôt qu'en cliquant sur des boutons. C'est rapide, puissant et très apprécié des développeurs.

<div style="background: #0d1118; border-radius: 10px; border: 1px solid #222a38; overflow: hidden; margin: 20px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
  <div style="background: #151b27; padding: 10px 15px; display: flex; gap: 8px; border-bottom: 1px solid #222a38;">
    <div style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56;"></div>
    <div style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e;"></div>
    <div style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f;"></div>
  </div>
  <div style="padding: 15px; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 14px; line-height: 1.6; color: #eef2fa;">
    <span style="color: #54d6e8;">~</span> <span style="color: #8d98ab;">$</span> devhub snippet add hello "console.log('Bonjour !')"<br>
    <span style="color: #4fd1a5;">✅ Snippet "hello" ajouté !</span><br>
    <span style="color: #54d6e8;">ℹ</span> 📁 Stocké dans : ~/.devhub/snippets.json
  </div>
</div>

<p align="center">
  <img src="/cli-preview.png" alt="Aperçu de DevHub CLI" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.3); max-width: 100%;" />
</p>

DevHub est un CLI conçu pour centraliser vos outils de développeur.

## 📦 Prérequis

Avant d'installer DevHub, assurez-vous d'avoir :

- **Node.js** v20 ou supérieur
- **npm** (installé avec Node.js)

## 🔧 Installation

### Depuis les sources (actuellement)

```bash
git clone https://github.com/cianneydev/devhub.git
cd devhub
npm install
npm run build
npm link