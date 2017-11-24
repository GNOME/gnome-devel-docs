
#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

class HelloWorld {
    constructor() {
        this.application = new Gtk.Application();
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    _onActivate() {
        this._window.show_all();
    }

    _onStartup() {
        let builder = new Gtk.Builder();
        builder.add_from_file('tour.glade');
        this._window = builder.get_object('window1');
        this.application.add_window(this._window);
    }
};

let app = new HelloWorld();
app.application.run(ARGV);
