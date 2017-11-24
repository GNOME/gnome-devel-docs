#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;

class Application {

    //create the application
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.myapp',
            flags: Gio.ApplicationFlags.FLAGS_NONE
        });

        //connect to 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    //create the UI (in this case it's just the ApplicationWindow)
    _buildUI() {
        this._window = new Gtk.ApplicationWindow({ application: this.application,
                                                   window_position: Gtk.WindowPosition.CENTER,
                                                   title: "MenuButton Example" });
        this._window.set_default_size(600, 400);
        this.grid = new Gtk.Grid();
        this._window.add(this.grid);


        this._menuButton = new Gtk.MenuButton();
        this.grid.attach(this._menuButton, 0, 0, 1, 1 );
        this.menu = Gtk.Menu.new_from_model(this.menuModel);

        this.menu.show();
        this._menuButton.set_menu_model (this.menuModel);
        this._menuButton.set_size_request(80, 35);
        this._menuButton.show();

        this._window.show_all();
    }

    _showNew() {
        print("You clicked \"New\"");
    }

    _showAbout() {
        print("You clicked \"About\"");
    }

    //create the menu items and connect the signals to the callback functions.
    _initMenus() {
        let newAction = new Gio.SimpleAction({ name: 'new' });
        newAction.connect('activate', () => { this._showNew(); });
        this.application.add_action(newAction);

        let aboutAction = new Gio.SimpleAction({ name: 'about' });
        aboutAction.connect('activate', () => { this._showAbout(); });
        this.application.add_action(aboutAction);

        let quitAction = new Gio.SimpleAction({ name: 'quit' });
        quitAction.connect('activate', () => { this._window.destroy(); });
         this.application.add_action(quitAction);

        this.menuModel = new Gio.Menu();

        this.menuItemNew = Gio.MenuItem.new("New", 'app.new');
        this.menuItemAbout = Gio.MenuItem.new("About", 'app.about');
        this.fileMenuItem = Gio.MenuItem.new("Other", null);

        this.menuModel.append_item(this.menuItemNew);
        this.menuModel.append_item(this.menuItemAbout);

        //submenu
        this.subMenu = new Gio.Menu();
        this.fileMenuItem.set_submenu(this.subMenu);
        this.menuItemQuit = Gio.MenuItem.new("Quit", 'app.quit');
        this.subMenu.append_item(this.menuItemQuit);
        this.menuModel.append_item(this.fileMenuItem);
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
let app = new Application();
app.application.run(ARGV);
