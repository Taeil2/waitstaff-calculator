const store = {
  mealPrice: 0,
  taxRate: 0,
  tipPercentage: 0,
  tipTotal: 0,
  mealCount: 0
};

/********** RENDER FUNCTION(S) **********/
function renderPage() {
  let html = `
    <section>
      <h2>Enter the Meal Details</h2>
      <form id="meal-details">
        <div class="form-group">
          <label>Base Meal Price:</label>
          <span>$</span><input type="text" class="dollar" id="mealPrice">
        </div>
        <div class="form-group">
          <label>Tax Rate</label>
          <span>%</span><input type="text" class="percentage" id="taxRate">
        </div>
        <div class="form-group">
          <label>Tip Percentage:</label>
          <span>%</span><input type="text" class="percentage" id="tipPercentage">
        </div>
        <div class="form-buttons">
          <button type="submit">Submit</button>
          <button type="button" class="cancel">Cancel</button>
        </div>
      </form>
    </section>
  `;

  $('.col1').html(html);
  renderResults('0.00', '0.00', '0.00', '0.00', 0, '0.00');
  initateEvents();
}

function renderResults(subtotal, tip, total, tipTotal, mealCount, averageTip) {
  let html = `
    <section class="charges">
      <h2>Customer Charges</h2>
      <div class="display-group">
        <label>Subtotal:</label>
        <span id="subtotal">$${subtotal}</span>
      </div>
      <div class="display-group">
        <label>Tip:</label>
        <span id="tip">$${tip}</span>
      </div>
      <hr />
      <div class="display-group">
        <label>Total:</label>
        <span id="total">$${total}</span>
      </div>
    </section>
    <section class="earnings">
      <h2>My Earnings Info</h2>
      <div class="display-group">
        <label>Tip Total:</label>
        <span id="tipTotal">$${tipTotal}</span>
      </div>
      <div class="display-group">
        <label>Meal count:</label>
        <span id="mealCount">${mealCount}</span>
      </div>
      <div class="display-group">
        <label>Average Tip Per Meal:</label>
        <span id="averageTip">$${averageTip}</span>
      </div>
    </section>
  `;

  $('.col2').html(html);
}

function initateEvents() {
  $('#meal-details').submit(function(e) {
    e.preventDefault();
    calculate();
  });

  $('.cancel').click(function() {
    $('#meal-details input').val('');
  });
}

function calculate() {
  let mealPrice = parseInt($('#mealPrice').val());
  let taxRate = parseInt($('#taxRate').val());
  let tipPercentage = parseInt($('#tipPercentage').val());

  if (!isNaN(mealPrice) && !isNaN(taxRate) && !isNaN(tipPercentage)) {
    store.mealPrice = mealPrice;
    store.taxRate = taxRate;
    store.tipPercentage = tipPercentage;

    let subtotal = mealPrice + mealPrice*taxRate/100;
    let tip = mealPrice * tipPercentage/100;
    let total = subtotal + tip;

    store.tipTotal += tip;
    store.mealCount += 1;

    let averageTip = store.tipTotal / store.mealCount;
    renderResults(subtotal.toFixed(2), tip, total.toFixed(2), store.tipTotal.toFixed(2), store.mealCount, averageTip.toFixed(2));
  } else {
    alert('Please enter numbers');
  }
}

$(renderPage);
