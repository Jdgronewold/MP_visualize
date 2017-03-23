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
  return (
    $.ajax({
      method: 'GET',
      url: 'api/mp/routes',
      data: { routes }
    })
  );
};

export const getTicks = (input, type) => {
  return (
    $.ajax({
      method: 'GET',
      url: 'api/mp/ticks',
      data: { input, type }
    })
  );
};
