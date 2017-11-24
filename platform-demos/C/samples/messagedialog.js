#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

class MessageDialogExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsmessagedialog',
            flags: Gio.ApplicationFlags.FLAGS_NONE
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this._window.present();
    }

    // Callback function for 'startup' signal initializes menus and builds the UI
    _onStartup() {
        this._initMenus();
        this._buildUI ();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "Gtk.MessageDialog Example",
            default_height: 200,
            default_width: 400
        });

        // Create a silly warning message and add it to the window
        this.warningLabel = new Gtk.Label({
            label: "This application goes boom! (Not really.)"
        });
        this._window.add (this.warningLabel);

        // Show the window and all child widgets
        this._window.show_all();
    }

    // Build the application menu, including the button that calls the dialog
    _initMenus() {
        let menu = new Gio.Menu();
        menu.append("Message",'app.message');
        menu.append("Quit",'app.quit');
        this.application.set_app_menu(menu);

        // This pops up a MessageDialog when "Message" is clicked in the menu
        let messageAction = new Gio.SimpleAction ({ name: 'message' });
        messageAction.connect('activate', () => { this._showMessageDialog(); });
        this.application.add_action(messageAction);

        // This closes the window when "Quit" is clicked in the menu
        let quitAction = new Gio.SimpleAction ({ name: 'quit' });
        quitAction.connect('activate', () => { this._window.destroy(); });
        this.application.add_action(quitAction);
    }

    _showMessageDialog() {

        // Create a modal MessageDialog whose parent is the window
        this._messageDialog = new Gtk.MessageDialog ({
            transient_for: this._window,
            modal: true,
            buttons: Gtk.ButtonsType.OK_CANCEL,
            message_type: Gtk.MessageType.WARNING,
            text: "This action will cause the universe to stop existing." });

        this._messageDialog.connect ('response', this._response_cb.bind(this));
        this._messageDialog.show();
    }

    // Callback function (aka signal handler) for the response signal
    _response_cb(messagedialog, response_id) {

        // A simple switch that changes the main window's label
        switch (response_id) {
            case Gtk.ResponseType.OK:
                this.warningLabel.set_label ("*BOOM*\n");
                break;
            case Gtk.ResponseType.CANCEL:
                this.warningLabel.set_label ("Good choice!\n");
                break;
            case Gtk.ResponseType.DELETE_EVENT:
                this.warningLabel.set_label ("Dialog closed or cancelled.\n");
                break;
        }

        this._messageDialog.destroy();

    }
};

// Run the application
let app = new MessageDialogExample ();
app.application.run (ARGV);
