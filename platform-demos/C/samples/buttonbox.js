#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

class ButtonBoxExample {

    // Create the application itthis
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsbuttonbox'
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
        this.window = new Gtk.ApplicationWindow  ({ application: this.application,
                                                    window_position: Gtk.WindowPosition.CENTER,
                                                    title: "Calculator",
                                                    default_width: 350,
                                                    default_height: 200,
                                                    border_width: 10 });
        this.entry = new Gtk.Entry();
        this.entry.set_text('0');
        // text aligned on the right
        this.entry.set_alignment(1);
        // the text in the entry cannot be modified by writing in it
        this.entry.set_can_focus(false);

        // a grid
        this.grid = new Gtk.Grid();
        this.grid.set_row_spacing(5);
        
        // to attach the entry
        this.grid.attach(this.entry, 0, 0, 1, 1);
        
        // the labels for the buttons
        this.buttons = [ 7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 'C', 0, '=', '+' ];
        
        // each row is a ButtonBox, attached to the grid            
        for (let i = 0; i < 4; i++) {
            this.hbox = Gtk.ButtonBox.new(Gtk.Orientation.HORIZONTAL);
            this.hbox.set_spacing(5);
            this.grid.attach(this.hbox, 0, i + 1, 1, 1);
            // each ButtonBox has 4 buttons, connected to the callback function
            for (let j= 0; j < 4; j++) {
                this.button = new Gtk.Button();
                this.buttonLabel = (this.buttons[i * 4 + j].toString());
                this.button.set_label(this.buttonLabel);
                this.button.set_can_focus(false);
                this.button.connect("clicked", this._buttonClicked.bind(this));
                this.hbox.add(this.button);
            }
        }
            
        // some variables for the calculations
        this.firstNumber = 0;
        this.secondNumber = 0;
        this.counter = 0;
        this.operation = "";

        // add the grid to the window
        this.window.add(this.grid);
        this.window.show_all();
    }

    // callback function for all the buttons
    _buttonClicked(button) {
        this.button = button;
        // for the operations
        if (this.button.get_label() == '+') {
            this.counter += 1 
            if (this.counter > 1)
                this._doOperation();
            this.entry.set_text('0');
            this.operation = "plus";
        }

        else if (this.button.get_label() == '-') {
            this.counter += 1;
            if (this.counter > 1)
                this._doOperation();
            this.entry.set_text('0');
            this.operation = "minus";
        }

        else if (this.button.get_label() == '*') {
            this.counter += 1; 
            if (this.counter > 1)
                this._doOperation();
            this.entry.set_text('0');
            this.operation = "multiplication";
        }

        else if (this.button.get_label() == '/') {
            this.counter += 1 
            if (this.counter > 1)
                this._doOperation();
            this.entry.set_text('0');
            this.operation = "division";
        }

        // for =
        else if (this.button.get_label() == '=') {
            this._doOperation();
            this.entry.set_text(this.firstNumber.toString());
            this.counter = 1;
        }

        // for Cancel
        else if (this.button.get_label() == 'C') {
            this.firstNumber = 0;
            this.secondNumber = 0;
            this.counter = 0;
            this.entry.set_text('0');
            this.operation = "";
        }

        // for a digit button
        else {
            this.newDigit = parseInt(this.button.get_label());
            if (this.entry.get_text() == "error")
                this.number = 0;
            else
                this.number = parseInt(this.entry.get_text());
            this.number = this.number * 10 + this.newDigit;            
            if (this.counter == 0)
                this.firstNumber = this.number;
            else
                this.secondNumber = this.number;
            this.entry.set_text(this.number.toString());
        }
     }

     _doOperation() {
        if (this.operation == "plus") {
           this.firstNumber += this.secondNumber;
        } else if (this.operation == "minus") {
            this.firstNumber -= this.secondNumber;
        } else if (this.operation == "multiplication") {
            this.firstNumber *= this.secondNumber;
        } else if (this.operation == "division") {
            if (this.secondNumber != 0) {
                this.firstNumber /= this.secondNumber;
            } else {
                this.firstNumber = 0; 
                this.secondNumber = 0;
                this.counter = 0; 
                this.entry.set_text("error");
                this.operation = "";

                return
            }
        } else {
            this.firstNumber = 0;
            this.secondNumber = 0;
            this.counter = 0;
            this.entry.set_text("error");
        }
    }
};

// Run the application
let app = new ButtonBoxExample();
app.application.run (ARGV);
