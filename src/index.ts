import {
  commands,
  CompleteResult,
  ExtensionContext,
  listManager,
  sources,
  workspace,
} from 'coc.nvim'
// import DemoList from './lists';

export async function activate(context: ExtensionContext): Promise<void> {
  // workspace.showMessage(`coc-conventional works!!!`);

  context.subscriptions.push(
    // commands.registerCommand('coc-conventional.Command', async () => {
    //   workspace.showMessage(`coc-conventional Commands works!`);
    // }),

    // listManager.registerList(new DemoList(workspace.nvim)),

    sources.createSource({
      name: 'coc-conventional-type', // unique id
      shortcut: 'CC Type',
      filetypes: ['gitcommit'],
      priority: 1,
      triggerPatterns: [], // RegExp pattern
      shouldComplete: async () => {
        let { nvim } = workspace
        let [, lnum, col] = await nvim.call('getpos', '.')
        return lnum === 1 && col === 1
      },
      doComplete: async () => {
        const items = await getTypeCompletionItems()
        return items
      },
    }),

    sources.createSource({
      name: 'coc-conventional-lerna-scope', // unique id
      shortcut: 'CC Scope',
      priority: 1,
      triggerPatterns: [
        /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\(\s*/,
      ],
      // shouldComplete: async () => {
      //   let { nvim } = workspace
      //   let [, lnum, col] = await nvim.call('getpos', '.')
      //   return lnum === 1 && col === 1
      // },
      doComplete: async () => {
        const items = await getScopeCompletionItems()
        return items
      },
    }),

    // workspace.registerKeymap(
    //   ['n'],
    //   'coc-conventional-keymap',
    //   async () => {
    //     workspace.showMessage(`registerKeymap`);
    //   },
    //   { sync: false }
    // ),

    // workspace.registerAutocmd({
    //   event: 'InsertLeave',
    //   request: true,
    //   callback: () => {
    //     workspace.showMessage(`registerAutocmd on InsertLeave`);
    //   }
    // })
  )
}

async function getTypeCompletionItems(): Promise<CompleteResult> {
  let matches = [
    'build',
    'chore',
    'ci',
    'docs',
    'feat',
    'fix',
    'perf',
    'refactor',
    'revert',
    'style',
    'test',
  ]
  return {
    items: matches.map((m) => {
      return {
        word: m,
        abbr: m,
        filterText: m,
        menu: 'CC Type',
      }
    }),
  }
}

async function getScopeCompletionItems(): Promise<CompleteResult> {
  let matches = ['package1', 'package2']
  return {
    items: matches.map((m) => {
      return {
        word: m,
        abbr: m,
        filterText: m,
        menu: 'CC Scope',
      }
    }),
  }
}
