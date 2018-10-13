function openCardInfo(itemname, storename, price, image, rating) {
    var popup = document.getElementById("myPopup");
    document.getElementById('item-name').innerHTML  = itemname;
    document.getElementById('store-name').innerHTML = storename;
    document.getElementById('price').innerHTML      = "$" + parseFloat(price).toFixed(2) + " MXN";
    document.getElementById('item-image').src       = image;
    //document.getElementById('rating')           = rating;
    popup.classList.remove("hide");
    popup.classList.toggle("show");
}
