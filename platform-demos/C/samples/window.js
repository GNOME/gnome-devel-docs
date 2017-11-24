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

       this.application.connect('activate', this._onActivate.bind(this));
    }

    //callback function for 'activate' signal
    _onActivate() {
        let myWindow = new Gtk.Window({type: Gtk.WindowType.TOPLEVEL});
        myWindow.title = "Welcome to GNOME";

       /* Here are a few ways we can customize our window.
       Try uncommenting them or changing their values! */
        //myWindow.set_default_size (400,200);
        //myWindow.set_has_resize_grip (false);
        //myWindow.set_opacity (0.5);
        //myWindow.maximize ();

        //show the window and all child widgets (none in this case)
        myWindow.show_all();
        this.application.add_window(myWindow);
    }
};

//run the application
let app = new Application ();
app.application.run (ARGV);
