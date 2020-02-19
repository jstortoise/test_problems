
function TreeConstructor(strArr) { 
  let treeset = {};
  let nodeCount = 0;
  for (let link of strArr) {
    let nodes = link.replace('(', '').replace(')', '').split(',');
    if (nodes[0] in treeset) {
      if (treeset[nodes[0]].parent == null) {
        treeset[nodes[0]].parent = nodes[1];
      }
      else if (treeset[nodes[0]].parent != nodes[1]) {
        return false;
      } else {
        continue;
      }
    } else {
      treeset[nodes[0]] = {
        parent: nodes[1],
        children: []
      }
    }

    if (nodes[1] in treeset) {
      treeset[nodes[1]].children.push(nodes[0]);
    } else {
      treeset[nodes[1]] = {
        parent: null,
        children: [nodes[0]]
      };
    }
  }

  // check each node has proper parent and proper children
  let rootCount = 0, rootNode = null;
  for (let node in treeset) {
    if (treeset[node].parent == null) {
      rootCount++;
      rootNode = node;
    }
    if (treeset[node].children.length > 2) {
      return false;
    }
  }

  if (rootCount != 1) {
    return false;
  }

  // code goes here  
  return flatTree(treeset, rootNode).length == Object.keys(treeset).length;

}

function flatTree(treeset, node) {
  let arr = [node];
  for (let child of treeset[node].children) {
    let descendants = flatTree(treeset, child)
    arr = [...arr, ...descendants];
  }

  return arr;
}
   
// keep this function call here 
console.log(TreeConstructor( ["(1,2)", "(2,4)", "(5,7)", "(7,2)", "(9,5)", "(4,1)", "(10,11)"]));