#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

class ScrolledWindowExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jscrolledwindow'
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this.window.present();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {
        // Create the application window
        this.window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "ScrolledWindow Example",
            default_width: 200,
            default_height: 200,
            border_width: 10
        });
        // the scrolledwindow
        this.scrolledWindow = new Gtk.ScrolledWindow();
        this.scrolledWindow.set_border_width(10);
        // there is always the scrollbar (otherwise: AUTOMATIC - only if needed - or NEVER)
        this.scrolledWindow.set_policy(Gtk.PolicyType.ALWAYS, Gtk.PolicyType.ALWAYS);
        // an image - slightly larger than the window
        this.image = new Gtk.Image();
        this.image.set_from_file("gnome-image.png");

        // add the image to the scrolledwindow
        this.scrolledWindow.add_with_viewport(this.image);

        // add the scrolledwindow to the window
        this.window.add(this.scrolledWindow);
        this.window.show_all();
    }
};

// Run the application
let app = new ScrolledWindowExample();
app.application.run (ARGV);
