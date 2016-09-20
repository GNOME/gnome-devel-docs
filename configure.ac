AC_INIT([gnome-devel-docs],[3.22.0])

AM_INIT_AUTOMAKE([no-dist-gzip dist-xz])
AM_SILENT_RULES([yes])
AM_MAINTAINER_MODE([enable])

YELP_HELP_INIT

# C compiler and pkg-config for testing demo source code.
# These dependencies are all optional: it must be possible for documenters to
# run `./configure && make` without needing anything more than autotools and
# Yelp. `make check` and `make distcheck` may require the compilers.
AC_PATH_PROG([CC],[cc])
PKG_PROG_PKG_CONFIG

PKG_CHECK_MODULES([GLIB],[glib-2.0 gobject-2.0 gio-2.0],
                  [have_glib=yes],[have_glib=no])

AM_CONDITIONAL([BUILD_TESTS],[test "$CC" != "" && test "$have_glib" = "yes"])

AC_OUTPUT([
Makefile
accessibility-devel-guide/Makefile
platform-demos/Makefile
hig/Makefile
optimization-guide/Makefile
platform-overview/Makefile
programming-guidelines/Makefile
])
