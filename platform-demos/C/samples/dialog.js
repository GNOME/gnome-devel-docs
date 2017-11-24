#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

class DialogExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application ({
            application_id: 'org.example.jsdialog',
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

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
            this._window = new Gtk.ApplicationWindow  ({ application: this.application,
                                                         window_position: Gtk.WindowPosition.CENTER,
                                                         title: "Gtk.Dialog Example",
                                                         default_height: 50,
                                                         default_width: 250 });

        // Create a button
        this._button = new Gtk.Button ({label: "Click Me"});
        this._window.add (this._button);

        // Bind it to the function that creates the dialog
        this._button.connect ("clicked", this._createDialog.bind(this));

                // Show the window and all child widgets
                this._window.show_all();
    }

    _createDialog() {

        // Create the dialog
        this._dialog = new Gtk.Dialog ({ transient_for: this._window,
                         modal: true,
                         title: "A Gtk+ dialog" });

        // Create the dialog's content area, which contains a message
        this._contentArea = this._dialog.get_content_area();
        this._message = new Gtk.Label ({label: "This demonstrates a dialog with a label"});
        this._contentArea.add (this._message);

        // Create the dialog's action area, which contains a stock OK button
        this._actionArea = this._dialog.get_action_area();
        this._OKButton = Gtk.Button.new_from_stock (Gtk.STOCK_OK);
        this._actionArea.add (this._OKButton);

        // Connect the button to the function that handles what it does
        this._OKButton.connect ("clicked", this._OKHandler.bind(this));

        this._dialog.show_all();
    }

    _OKHandler(dialog, response_id) {

        // Destroy the dialog
        this._dialog.destroy();
    }

};

// Run the application
let app = new DialogExample ();
app.application.run (ARGV);
