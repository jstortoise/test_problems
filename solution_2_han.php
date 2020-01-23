<?php

function solution($N, $S, $T) {
    $arr = initArray($N);

    $arr = initHits($arr, $T);

    $ships = explode(",", $S);

    $sunk_count = 0, $hit_count = 0;
    for ($i = 0; $i < sizeof($ships); $i++) {
        $ship = explode(" ", $ships[$i]);

        $x1 = intval($ship[0]) - 1;
        $y1 = ord(str_replace($x1 + 1, "", $ship[0])) - 65;

        $x2 = intval($ship[1]) - 1;
        $y2 = ord(str_replace($x2 + 1, "", $ship[1])) - 65;

        $status = getShipStatus($arr, $x1, $y1, $x2, $y2);

        if ($status == -1) {
            $sunk_count++;
        } else if ($status == 1) {
            $hit_count++;
        }
    }

    echo $sunk_count;
    echo $hit_count;
}

function initArray($n) {
    $arr = array();

    for ($i = 0; $i < $n; $i++) {
        $arr[$i] = array();
        for ($j = 0; $j < $n; $j++) {
            $arr[$i][$j] = -1;
        }
    }
}

function initHits($arr, $T) {
    $hits = explode(" ", $T);
    for ($i = 0; $i < sizeof($hits); $i++) {
        $x = intval($hits[$i]) - 1;
        $y = ord(str_replace($x + 1, "", $hits[$i])) - 65;

        $arr[$x][$y] = 0;
    }

    return $arr;
}

function getShipStatus($arr, $x1, $y1, $x2, $y2) {
    $hit_count = 0;

    for ($i = $x1; $i <= $x2; $i++) {
        for ($j = $y1; $j <= $y2; $j++) {
            if ($arr[$i][$j] == 0) {
                $hit_count++;
            }
        }
    }

    $cell_count = ($x2 - $x1 + 1) * ($y2 - $y1 + 1);

    if ($hit_count > 0) {
        if ($hit_count == $cell_count) {
            return -1; // Ship is sunk
        } else {
            return 1; // Hit but alive
        }
    } else {
        return 0; // Everything is ok
    }
}
?>