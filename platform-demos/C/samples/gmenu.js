#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

class Application {

    //create the application
    constructor() {
        this.application = new Gtk.Application ({
            application_id: 'org.example.myapp',
            flags: Gio.ApplicationFlags.FLAGS_NONE
        });

       //connect to 'activate' and 'startup' signals to the callback functions
       this.application.connect('activate', this._onActivate.bind(this));
       this.application.connect('startup', this._onStartup.bind(this));
    }

    //create the UI (in this case it's just the ApplicationWindow
    _buildUI() {
        this._window = new Gtk.ApplicationWindow  ({ application: this.application,
                                                   window_position: Gtk.WindowPosition.CENTER,
                                                   title: "Welcome to GNOME" });

        //uncommenting the line below will change the window size
        //this._window.set_default_size(600, 400);

        //show the window and all child widgets (none in this case)
        this._window.show_all();
    }

    _showNew() {
        print("This doesn't do anything. It is only a demonstration.");
    }

    _showAbout() {
        print("No AboutDialog here.  This is only a demonstration.");
    }

    //create the menu items and connect the signals to the callback functions.
    _initMenus() {
        let menu = new Gio.Menu();
        menu.append("New",'app.new');
        menu.append("About", 'app.about');
        menu.append("Quit",'app.quit');
        this.application.set_app_menu(menu);

        let newAction = new Gio.SimpleAction ({ name: 'new' });
        newAction.connect('activate', () => { this._showNew(); });
        this.application.add_action(newAction);

        let aboutAction = new Gio.SimpleAction ({ name: 'about' });
        aboutAction.connect('activate', () => { this._showAbout(); });
        this.application.add_action(aboutAction);

        let quitAction = new Gio.SimpleAction ({ name: 'quit' });
        quitAction.connect('activate', () => { this._window.destroy(); });
         this.application.add_action(quitAction);
    }

    //callback function for 'activate' signal
    _onActivate() {
        this._window.present();
    }

    //callback function for 'startup' signal
    _onStartup() {
        //You must call _initMenus() before calling _buildUI().
        this._initMenus();
        this._buildUI();
    }
};

//run the application
let app = new Application ();
app.application.run (ARGV);
