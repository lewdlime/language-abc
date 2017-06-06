'use babel';

import LanguageAbcView from './language-abc-view';
import { CompositeDisposable } from 'atom';

export default {

  languageAbcView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageAbcView = new LanguageAbcView(state.languageAbcViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageAbcView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-abc:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageAbcView.destroy();
  },

  serialize() {
    return {
      languageAbcViewState: this.languageAbcView.serialize()
    };
  },

  toggle() {
    console.log('LanguageAbc was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
