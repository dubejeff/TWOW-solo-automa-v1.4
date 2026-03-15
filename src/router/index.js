import { createRouter, createWebHashHistory } from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import ModuleExpansionSelection from '@/views/ModuleExpansionSelection.vue'
import SchoolSelection from '@/views/SchoolSelection.vue'
import PrepareMonsters from '@/views/PrepareMonsters.vue'
import RoundPlayer from '@/views/RoundPlayer.vue'
import Phase1_Movement from '@/components/player/Phase1_Movement.vue'
import Phase3_Rest from '@/components/player/Phase3_Rest.vue'
import EndOfGame from '@/components/player/EndOfGame.vue'

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome,
  },
  {
    path: '/ModuleExpansionSelection',
    name: 'ModuleExpansionSelection',
    component: ModuleExpansionSelection,
  },
  {
    path: '/SchoolSelection',
    name: 'SchoolSelection',
    component: SchoolSelection,
  },
  {
    path: '/PrepareMonsters',
    name: 'PrepareMonsters',
    component: PrepareMonsters,
  },
  {
    path: '/round/:roundId/player/:playerId',
    component: RoundPlayer,
    children: [
      {
        path: '',
        redirect: 'phase1',
        component: Phase1_Movement,
      },
      {
        path: 'phase1',
        name: 'MovementActions',
        component: Phase1_Movement,
      },
      {
        path: 'phase2',
        children: [
          {
            path: 'choice',
            name: 'Choice',
            component: () => import('@/components/player/Phase2_Choice.vue'),
          },
          {
            path: 'meditate',
            name: 'Meditate',
            component: () => import('@/components/player/Phase2_Meditate.vue'),
          },
          {
            path: 'fightMonster',
            name: 'FightMonster',
            component: () => import('@/components/player/Phase2_FightMonster.vue'),
          },
          {
            path: 'fightWitcher',
            name: 'FightWitcher',
            component: () => import('@/components/player/Phase2_FightWitcher.vue'),
          },
          {
            path: 'explore',
            name: 'Explore',
            component: () => import('@/components/player/Phase2_Explore.vue'),
          },
          {
            path: 'fightResult',
            name: 'FightResult',
            component: () => import('@/components/player/Phase2_FightResult.vue'),
          },
        ],
      },
      {
        path: 'phase3',
        name: 'DrawGainCards',
        component: Phase3_Rest,
      },
    ],
  },
  {
    path: '/endOfGame',
    name: 'EndOfGame',
    component: EndOfGame,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
