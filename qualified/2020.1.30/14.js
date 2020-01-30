// TODO: complete this object/class

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage){
  this._itemCount = collection.length;
  this._itemsPerPage = itemsPerPage;
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function() {
  return this._itemCount;
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function() {
  return Math.ceil(this._itemCount / this._itemsPerPage);
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function(pageIndex) {
  let pageCount = this.pageCount();
  if (pageIndex < 0) {
    return -1;
  } else if (pageIndex < pageCount - 1) {
    return this._itemsPerPage;
  } else if (pageIndex == pageCount - 1) {
    return this._itemCount - (pageCount - 1) * this._itemsPerPage;
  } else {
    return -1;
  }
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function(itemIndex) {
  if (itemIndex < 0 || itemIndex >= this._itemCount) {
    return -1;
  }
  
  return Math.floor(itemIndex / this._itemsPerPage)
}