<?php
// you can write to stdout for debugging purposes, e.g.
// print "this is a debug message\n";

function pointInsideRect($rect, $point) {
    $rect_points = explode(' ', $rect);

    $rect_row1 = intval(substr($rect_points[0], 0, -1));
    $rect_col1 = substr($rect_points[0], -1, 1);
    $rect_row2 = intval(substr($rect_points[1], 0, -1));
    $rect_col2 = substr($rect_points[1], -1, 1);
    
    $point_row = intval(substr($point, 0, -1));
    $point_col = substr($point, -1, 1);
        
    if ($rect_row1 <= $point_row &&
        $rect_row2 >= $point_row &&
        strcmp($rect_col1, $point_col) <= 0 &&
        strcmp($rect_col2, $point_col) >= 0) 
    {
        return true;    
    }
    return false;
}

function rect_size($rect) {

    $rect_points = explode(' ', $rect);

    $rect_row1 = intval(substr($rect_points[0], 0, -1));
    $rect_col1 = substr($rect_points[0], -1, 1);
    $rect_row2 = intval(substr($rect_points[1], 0, -1));
    $rect_col2 = substr($rect_points[1], -1, 1);
    
    return ($rect_row2 - $rect_row1 + 1) * (ord($rect_col2) - ord($rect_col1) + 1);
}

function solution($N, $S, $T) {
    // write your code in PHP7.0
    $ships = explode(',', $S);
    $hits = explode(' ', $T);
    
    $sunk_count = 0;
    $hit_count = 0;
    
    for ($i = 0; $i < count($ships); $i++) {
        $hits_for_ship = 0;
        for ($j = 0; $j < count($hits); $j++) {
            if (pointInsideRect($ships[$i], $hits[$j])) {
                $hits_for_ship++;        
            }
        }
        
        if (rect_size($ships[$i]) == $hits_for_ship) {
            $sunk_count++;    
        } else if ($hits_for_ship > 0) {
            $hit_count++;
        }
    }
    
    return $sunk_count . ',' . $hit_count;
}
