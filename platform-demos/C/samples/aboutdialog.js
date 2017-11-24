#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

class AboutDialogExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsaboutdialog',
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

    // Callback function for 'startup' signal creates the menu and builds the UI
    _onStartup() {
        this._initMenus();
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {
        // Create the application window
        this._window = new Gtk.ApplicationWindow({ application: this.application,
                                                   window_position: Gtk.WindowPosition.CENTER,
                                                   title: "AboutDialog Example",
                                                   default_height: 250,
                                                   default_width: 350 });

        // Show the window and all child widgets
        this._window.show_all();
    }

    // Create the application menu
    _initMenus() {
        let menu = new Gio.Menu();
        menu.append("About", 'app.about');
        menu.append("Quit",'app.quit');
        this.application.set_app_menu(menu);

        // Create the "About" menu option and have it call the _showAbout() function
        let aboutAction = new Gio.SimpleAction({ name: 'about' });
        aboutAction.connect('activate', () => { this._showAbout(); });
        this.application.add_action(aboutAction);

        // Create the "Quit" menu option and have it close the window
        let quitAction = new Gio.SimpleAction ({ name: 'quit' });
        quitAction.connect('activate', () => { this._window.destroy(); });
        this.application.add_action(quitAction);
    }

    _showAbout() {

        // String arrays of the names of the people involved in the project
        var authors = ["GNOME Documentation Team"];
        var documenters = ["GNOME Documentation Team"];

        // Create the About dialog
        let aboutDialog = new Gtk.AboutDialog({ title: "AboutDialog Example",
                                                program_name: "GtkApplication Example",
                                                copyright: "Copyright \xa9 2012 GNOME Documentation Team",
                                                authors: authors,
                                                documenters: documenters,
                                                website: "http://developer.gnome.org",
                                                website_label: "GNOME Developer Website" });

        // Attach the About dialog to the window
        aboutDialog.modal = true;
        aboutDialog.transient_for = this._window;

        // Show the About dialog
        aboutDialog.show();

        // Connect the Close button to the destroy signal for the dialog
        aboutDialog.connect('response', function() {
            aboutDialog.destroy();
        });
    }
};

// Run the application
let app = new AboutDialogExample();
app.application.run(ARGV);
