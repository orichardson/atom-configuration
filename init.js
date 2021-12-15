// Your init script

/*
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# An example hack to log to the console when each text editor is saved.
#
# atom.workspace.observeTextEditors (editor) ->
#   editor.onDidSave ->
#     console.log "Saved! #{editor.getPath()}"
# 
###### CUSTOMIZED ###########
# Another example, from https://flight-manual.atom.io/behind-atom/sections/keymaps-in-depth/
# in the context of writnig a custom command to chain things together. 
#
# A hack to put things together
# https://discuss.atom.io/t/parameters-in-atom-commands/67355
#
# atom.commands.add('atom-text-editor', 'custom:cut-line', function () {
#   const editor = this.getModel();
#   editor.selectLinesContainingCursors();
#   editor.cutSelectedText();
# });

# atom.commands.add 'atom-text-editor',
# 	'oli:salute-leader', ->
# 		editor = atom.workspace.getActiveTextEditor() editor.editorElement.classList.add 'leader-waiting'
# atom.commands.add 'atom-text-editor', 'oli:salute-leader', ->
# 	editor = atom.workspace.getActiveTextEditor()
# 	editor.editorElement.classList.add 'leader-waiting'*/


atom.commands.add('atom-text-editor', 'oli:newline-below', function() {
		editor = atom.workspace.getActiveTextEditor();
		editor.moveCursors(cursor => {
			pos = cursor.getBufferPosition();
			const indentLevel = Math.min(
				editor.indentationForBufferRow(pos.row),
				editor.indentationForBufferRow(pos.row+1));
			cursor.moveToEndOfLine();
			cursor.selection.insertText("\n");
			
			if ( editor.shouldAutoIndent() &&
				editor.indentationForBufferRow(pos.row+1) < indentLevel) {
					editor.setIndentationForBufferRow(pos.row+1, indentLevel); }
			
			cursor.setBufferPosition(pos);
		});
	});

atom.commands.add('atom-text-editor', 'oli:newline-above', function() {
		editor = atom.workspace.getActiveTextEditor();
		editor.moveCursors(cursor => {
			pos = cursor.getBufferPosition();
			const indentLevel = editor.indentationForBufferRow(pos.row);
			cursor.moveToBeginningOfLine();
			cursor.selection.insertText("\n");
			
			if ( editor.shouldAutoIndent() &&
				editor.indentationForBufferRow(pos.row) < indentLevel) {
					editor.setIndentationForBufferRow(pos.row, indentLevel); }
			
			pos.row += 1;
			cursor.setBufferPosition(pos);
		});
	});
// On: any other command (e.g., pressing some letters) then the .leader-waiting state goes away
