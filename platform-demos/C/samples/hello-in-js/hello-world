#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0'
const Gtk = imports.gi.Gtk;

class Application {

    //create the application
    constructor() {
        this.application = new Gtk.Application();

       //connect to 'activate' and 'startup' signals to handlers.
       this.application.connect('activate', this._onActivate.bind(this));
       this.application.connect('startup', this._onStartup.bind(this));
    }

    //create the UI
    _buildUI() {
        this._window = new Gtk.ApplicationWindow({ application: this.application,
                                                   title: "Hello World!" });
        this._window.set_default_size(200, 200);
        this.label = new Gtk.Label({ label: "Hello World" });
        this._window.add(this.label);
    }

    //handler for 'activate' signal
    _onActivate() {
        //show the window and all child widgets
        this._window.show_all();
    }

    //handler for 'startup' signal
    _onStartup() {
        this._buildUI();
    }
};

//run the application
let app = new Application();
app.application.run(ARGV);
