
const itemsList = document.getElementById('itemsList');
const searchBar = document.getElementById('searchBar');
let hpItems = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredItems = hpItems.filter((item) => {
        return (
            item.category.toLowerCase().includes(searchString) || item.description.toLowerCase().includes(searchString) || item.title.toLowerCase().includes(searchString)
        );
    });
    displayItems(filteredItems);
});

const loadItems = async () => {
    try {
        const res = await fetch('product_dummy_data.txt');
        hpItems = await res.json();
        displayItems(hpItems);
    } catch (err) {
        console.error(err);
    }
};

const displayItems = (items) => {
    const htmlString = items
        .map((item) => {
            return `
        
        <div class="container-lg">		
			<div class="row my-10 align-items-center justify-content-center g-0">
                <div class="col-8 col-lg-3 col-xl-3" style="width:85%;">
					<div class="card border-primary rounded-5" style="height: 30rem; position:relative;">
						<div class="card-body text-center py-10 my-20">
							<h4 class="card-title">${item.title}</h4>
							<p class="lead card-subtitle"  ><img src="${item.thumbnail}" class="my-images card-img-top" style="max-width:70%; max-height:20%; position : absolute; left:48px; top:78px;"></p>
							<p class="disply-5 my-10 text-secondary" style = "position : absolute; top:250px; "> ${item.description}</p><br>
							<p class="disply-5 my-10" style = "position : absolute; top:350px; left:32%; "> Ratings: ${item.rating}/5.00</p><br>
							<p class="lead card-subtitle" style = " position: absolute; bottom:75px; left:42%;"><strong>$ ${item.price}</strong></p>
							<a href="#" class="btn btn-outline-primary btn-lg mb-3 text-right" style = "position : absolute; bottom:0px; left:34%; ">Buy Now</a>
						</div>
					</div>
				</div>
            </div>
        </div>
        `;
        })
        .join('');
    itemsList.innerHTML = htmlString;
};

loadItems();