<?php

/**
 * Settings page to define custom settings
 * GEOLOCATION : is the pair of latitude,longitude of the location
 *  eg: "40.714224,-73.961452" for NewYork
 * ADDRESS : is the physical address of the location
 *  eg: Kerala, India
 *      London
 * CONTENTTYPE : IMG|URL|TXT
 *  IMG => It's for image path 
 *      if TYPE is IMG the CONTENT must be path 
 *      eg: http://webneel.com/wallpaper/sites/default/files/images/04-2013/indian-beach-wallpaper.jpg
 * URL => It's for iframe/url 
 *      if TYPE is URL the CONTENT must be url of the content 
 *      eg: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d355071.77657984296!2d75.975766833721!3d10.498620106349756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15ed42d1bb%3A0x82e45aa016ca7db!2sThrissur%2C+Kerala!5e0!3m2!1sen!2sin!4v1437649199617
 * TXT => it's for other type of content, like text/html type
 *      eg1: <p>sample <b>text</b></p>
 *      eg2: sample text  
 * CONTENT : Is the content to be displayed if the current location and 
 *  pre-defined location is in same country
 * 
 * NOTE:[If you want to make any settings off, replace value with "NULL"]
 */

define("SETTINGS", "LOCATOR");
define("GEOLOCATION","NULL");
define("ADDRESS","Thrissur");
define("CONTENTTYPE","IMG");
define("CONTENT","http://webneel.com/wallpaper/sites/default/files/images/04-2013/indian-beach-wallpaper.jpg");

