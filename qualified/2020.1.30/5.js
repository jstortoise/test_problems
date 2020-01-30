const possibilities = signals => {
  var morse_tree = {
    val: '',
    left: {
      val: 'E',
      left: {
        val: 'I',
        left: {
          val: 'S'
        },
        right: {
          val: 'U'
        }
      },
      right: {
        val: 'A',
        left: {
          val: 'R'
        },
        right: {
          val: 'W'
        }
      }
    },
    right: {
      val: 'T',
      left: {
        val: 'N',
        left: {
          val: 'D'
        },
        right: {
          val: 'K'
        }
      },
      right: {
        val: 'M',
        left: {
          val: 'G'
        },
        right: {
          val: 'O'
        }
      }
    }
  };
  
  let subtrees = [
    morse_tree
  ];
  
  for (let i = 0; i < signals.length; i++) {
    let temp = [];
    for (let j = 0; j < subtrees.length; j++) {
      if (signals[i] == '.' || signals[i] == '?') {
        temp.push(subtrees[j].left);
      }
      if (signals[i] == '-' || signals[i] == '?') {
        temp.push(subtrees[j].right);
      }
    }
    subtrees = temp;
  }
  
  return subtrees.map(obj => obj.val);
};