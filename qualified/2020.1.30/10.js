function sjf (jobs,index) {
    var cc = jobs[index];
    for (var i = 0; i < jobs.length; i++) {
      if (i != index && (jobs[index] > jobs[i] || (jobs[index] == jobs[i] && i < index))) {
        cc += jobs[i];
      }
    }
    return cc;
  }