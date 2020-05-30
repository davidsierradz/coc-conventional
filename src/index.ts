import {
  CompleteResult,
  ExtensionContext,
  sources,
  workspace,
  Uri,
} from 'coc.nvim'
import resolveFrom from 'resolve-from'

interface LernaPackage {
  name: string
}
declare var __webpack_require__: any
declare var __non_webpack_require__: any
const requireFunc =
  typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('coc-conventional')
  const status = config.get<boolean>('enabled', true)
  if (!status) {
    return
  }

  let document = await workspace.document
  let conventionalConfigPath = resolveFrom.silent(
    Uri.parse(document.uri).fsPath,
    '@commitlint/config-conventional',
  )
  if (conventionalConfigPath == undefined) {
    workspace.showMessage('Cannot find @commitlint/config-conventional!')
    return
  }

  let conventionalConfig = requireFunc(conventionalConfigPath)

  async function getTypeCompletionItems(): Promise<CompleteResult> {
    let matches: Array<string> = []
    if (conventionalConfig.rules['type-enum'][2]) {
      matches = conventionalConfig.rules['type-enum'][2]
    } else {
      matches = [
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
    }

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

  context.subscriptions.push(
    sources.createSource({
      name: 'coc-conventional-type',
      shortcut: 'CC Type',
      filetypes: ['gitcommit'],
      priority: 1,
      triggerPatterns: [],
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
  )

  if (config.get<boolean>('enableLernaScopes', false)) {
    let lernaPath = resolveFrom.silent(
      Uri.parse(document.uri).fsPath,
      '@lerna/project',
    )

    if (lernaPath == undefined) {
      workspace.showMessage('Cannot find @lerna/project!')
      return
    }

    let lernaModule = requireFunc(lernaPath)

    const pkgs = (await lernaModule.getPackages())
      .map((pkg: LernaPackage) => pkg.name)
      .map((name: string) =>
        name.charAt(0) === '@' ? name.split('/')[1] : name,
      )

    async function getScopeCompletionItems(): Promise<CompleteResult> {
      let matches: Array<string> = []
      if (pkgs) {
        matches = pkgs
      } else {
        matches = []
      }
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

    context.subscriptions.push(
      sources.createSource({
        name: 'coc-conventional-lerna-scope',
        shortcut: 'CC Scope',
        priority: 1,
        triggerCharacters: ['('],
        triggerPatterns: [/^.*\(/],
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
    )
  }
}
