// need to learn how to start a server and run the php or ruby script from
// there
// https://gist.github.com/Haseeb-Qureshi/a27e73d25ecd27fadaf63648be9ff74f




var key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3";

// export const getTicks = (email) => {
//   var url =
//     'https://www.mountainproject.com/data?action=getTicks&userId=' +
//     email + '&key=' + key;
//     console.log(url);
//     return (
//       $.ajax({
//         type: 'GET',
//         url: url
//       })
//     );
// };

export const getRoutes = (routes) => {
  var url = 'https://www.mountainproject.com/data?action=getRoutes&routeIds=' +
  routes.join + '&key=' + key;
  console.log(url);
  return (
    $.post('/php_read.php', { url: url}, (data) => {
      console.log(data);
      return data;
    })
  );
};

export const getTicks = (email) => {
  var url =
    'https://www.mountainproject.com/data?action=getTicks&userId=' +
    email + '&key=' + key;
    console.log(url);
    debugger
  return (
    $.post('/php_read.php', { url: url}, (data) => {
      console.log(data);
      debugger;
      return data;
    })
  );
};
