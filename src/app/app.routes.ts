import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'checklist',
    loadComponent: () => import('./pages/checklist/checklist.page').then(m => m.ChecklistPage)
  },
  {
    path: 'abastecimento',
    loadComponent: () => import('./pages/abastecimento/abastecimento.page').then( m => m.AbastecimentoPage)
  },
  {
    path: 'espera',
    loadComponent: () => import('./pages/espera/espera.page').then( m => m.EsperaPage)
  },
  {
    path: 'configuracao',
    loadComponent: () => import('./pages/configuracao/configuracao.page').then( m => m.ConfiguracaoPage)
  },
  {
    path: 'manutencao',
    loadComponent: () => import('./pages/manutencao/manutencao.page').then( m => m.ManutencaoPage)
  },
  {
    path: 'rota',
    loadComponent: () => import('./pages/rota/rota.page').then( m => m.RotaPage)
  },
  {
    path: 'sincronizar',
    loadComponent: () => import('./pages/sincronizar/sincronizar.page').then( m => m.SincronizarPage)
  },
  {
    path: 'viagem',
    loadComponent: () => import('./pages/viagem/viagem.page').then( m => m.ViagemPage)
  },
  {
    path: 'menu-checklist',
    loadComponent: () => import('./pages/menu-checklist/menu-checklist.page').then( m => m.MenuChecklistPage)
  },
  {
    path: 'lista-checklist',
    loadComponent: () => import('./pages/lista-checklist/lista-checklist.page').then( m => m.ListaChecklistPage)
  },
  {
    path: 'checklist-item/:id',
    loadComponent: () => import('./pages/checklist-item/checklist-item.page').then( m => m.ChecklistItemPage)
  },
];
