/*CMD
  command: callback_query
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

function onCallbackQuery(query) {
  let baseCommand = query.data.split('_')[0];
  let newPage = parseInt(query.data.split('_')[2]);

  if (baseCommand === 'nextpage') {
    currentPage = newPage;
  } else if (baseCommand === 'previouspage') {
    currentPage = newPage;
  }
  
  let paginatedProductList = getProductsForPage(productList, currentPage, itemsPerPage);
  
  Api.editMessageText({
    chat_id: query.message.chat.id,
    message_id: query.message.message_id,
    text: "*📚 RESOURCES*\n_Find a BJS code you need._\n\n" + paginatedProductList,
    reply_markup: JSON.stringify({inline_keyboard: [getPagingInlineKeyboard(currentPage, productCount, itemsPerPage)]})
  });
});
