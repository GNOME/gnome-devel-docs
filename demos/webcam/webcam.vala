/*
 * Compile using:
 * valac --pkg gtk+-2.0 --pkg gdk-x11-2.0 --pkg gstreamer-0.10 --pkg gstreamer-interfaces-0.10 webcam.vala
 *
 */
using Gtk;
using Gst;

public class Webcam : Window
{
  private DrawingArea drawing_area;
  private Element camerabin;
  private int counter = 1;

  public Webcam ()
  {
    var vbox = new VBox (false, 0);
    this.drawing_area = new DrawingArea ();
    this.drawing_area.set_size_request (640, 480);
    vbox.pack_start (this.drawing_area, true, true, 0);

    var photo_button = new Button.with_label ("Take a picture");
    photo_button.clicked.connect (on_take_picture);

    var button_box = new HButtonBox ();
    button_box.add (photo_button);
    vbox.pack_start (button_box, false, true, 0);

    this.add (vbox);

    this.camerabin = Gst.ElementFactory.make ("camerabin", "camera");
    var bus = this.camerabin.get_bus ();
    bus.set_sync_handler (on_bus_callback);

    this.camerabin.set_state (State.PLAYING);
  }

  private BusSyncReply on_bus_callback (Gst.Bus bus, Gst.Message message)
  {

    if (message.get_structure () != null && message.get_structure().has_name("prepare-xwindow-id")) {
      var xoverlay = message.src as XOverlay;
      xoverlay.set_xwindow_id (Gdk.x11_drawable_get_xid (this.drawing_area.window));
      return BusSyncReply.DROP;
    }

    return BusSyncReply.PASS;
  }

  private void on_take_picture ()
  {
    var filename = "photo" + "%d".printf (this.counter) + ".jpg";
    this.counter++;
    this.camerabin.set ("filename", filename);
    Signal.emit_by_name (this.camerabin, "capture-start");
  }

  public static int main (string[] args)
  {
    Gst.init (ref args);
    Gtk.init (ref args);

    var webcam = new Webcam ();
    webcam.show_all ();

    Gtk.main ();

    return 0;
  }
}
