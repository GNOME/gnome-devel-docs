#include <gtk/gtk.h>



static void
activate (GtkApplication *app,
          gpointer        user_data)
{
  /* Declare variables */
  GtkWidget *window;
  GtkWidget *scrolled_window;
  GtkWidget *image;

  /* Create a window with a title, and a default size */
  window = gtk_application_window_new (app);
  gtk_window_set_title (GTK_WINDOW (window), "ScrolledWindow Example");
  gtk_window_set_default_size (GTK_WINDOW (window), 220, 200);

  /* Create the scrolled window. Usually NULL is passed for both parameters so
   * that it creates the horizontal/vertical adjustments automatically. Setting
   * the scrollbar policy to automatic allows the scrollbars to only show up
   * when needed.
   */
  scrolled_window = gtk_scrolled_window_new (NULL, NULL);
  /* Set the border width */
  gtk_container_set_border_width (GTK_CONTAINER (scrolled_window), 10);
  /* Extract our desired image from a file that we have */
  image = gtk_image_new_from_file ("gnome-image.png");
  /* And add it to the scrolled window */
  gtk_container_add (GTK_CONTAINER (scrolled_window), image);
  /* Set the policy of the horizontal and vertical scrollbars to automatic.
   * What this means is that the scrollbars are only present if needed.
   */
  gtk_scrolled_window_set_policy (GTK_SCROLLED_WINDOW (scrolled_window),
                                  GTK_POLICY_AUTOMATIC,
                                  GTK_POLICY_AUTOMATIC);

  gtk_container_add (GTK_CONTAINER (window), scrolled_window);

  gtk_widget_show_all (window);
}



int
main (int argc, char **argv)
{
  GtkApplication *app;
  int status;

  app = gtk_application_new ("org.gtk.example", G_APPLICATION_FLAGS_NONE);
  g_signal_connect (app, "activate", G_CALLBACK (activate), NULL);
  status = g_application_run (G_APPLICATION (app), argc, argv);
  g_object_unref (app);

  return status;
}
