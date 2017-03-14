/*

TITLE:
  MODULE.JS

AUTHOR: Seagat2011
  http://fold.it/port/user/1992490
  http://eterna.cmu.edu/web/player/90270/

VERSION:
  Major.Minor.Release.Build
  1.0.0.0

STYLEGUIDE:
  http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml

REFERENCES:
  N/A

DESCRIPTION:
  module.js shell

INPUT:
  _

OUTPUT:
  _

*/

var g_moduleRefno = 0;
function Module(name)
{
  this.name = name || ("module"+g_moduleRefno++);
  this.property = [];
  this.attribute = [];
  this.g_globalProperty = [];
  this.ga_globalAttribute = [];
  this.m_memberProperty = [];
  this.ma_memberAttribute = [];
  this._constructor = [];
  this._property = [];
  this._attribute = [];
}