<?

function solution($N, $S, $T) {
    // write your code in PHP7.0

    // init all positions
    $positions = array();
    for ($i = 0; $i < $N; $i++) {
        $positions[$i] = array();
        for ($j = 0; $j < $N; $j++) {
            $positions[$i][$j] = -1;
        }
    }
    
    // get hit pos
    $hit_str = explode(" ", $T);
    $hit_pos = array();
    for ($i = 0; $i < sizeof($hit_str); $i++) {
        $hit_pos[$i] = array();
        $row = (int)substr($hit_str[$i], 0, 1);
        $col = ord(substr($hit_str[$i], 1, 1)) - 64;
        $hit_pos[$i][0] = $row;
        $hit_pos[$i][1] = $col;
        
        // set hit pos
        $positions[$row - 1][$col - 1] = 0;
    }
    
    // get ship pos
    $ship_sunk = 0;
    $ship_not_sunk = 0;
    $ship_str = explode(",", $S);
    $ship_pos = array();
    for ($i = 0; $i < sizeof($ship_str); $i++) {
        $ship_str1 = explode(" ", $ship_str[$i]);
        $ship_pos[$i] = array();
        for ($j = 0; $j < sizeof($ship_str1); $j++) {
            $ship_pos[$i][$j] = array();
            $row = (int)substr($ship_str1[$j], 0, 1);
            $col = ord(substr($ship_str1[$j], 1, 1)) - 64;
            $ship_pos[$i][$j][0] = $row;
            $ship_pos[$i][$j][1] = $col;
        }
        
        $status = getShipStatus($ship_pos[$i][0][0], $ship_pos[$i][0][1], $ship_pos[$i][1][0], $ship_pos[$i][1][1], $positions, $i + 1);
        if ($status == 0) {
            $ship_sunk++;
        } else if ($status == 1) {
            $ship_not_sunk++;
        }
    }
    
    return $ship_sunk . "," . $ship_not_sunk;
}

function getShipStatus($s_row, $s_col, $e_row, $e_col, $arr, $index) {
    $count_hit = 0;
    $ship_cells = 0;
    for ($i = $s_row - 1; $i < $e_row; $i++) {
        for ($j = $s_col - 1; $j < $e_col; $j++) {
            $ship_cells++;
            if ($arr[$i][$j] < 0) {
                $arr[$i][$j] = $index;
            } else if ($arr[$i][$j] == 0) {
                $count_hit++;
            }
        }
    }
    if ($count_hit > 0) {
        if ($count_hit == $ship_cells) {
            return 0; // status sunk
        } else {
            return 1; // hit but not sunk
        }
    } else {
        return -1; // status ok
    }
}

?>