const createTaskElement = function(task) {
  const itemName = task.task;
  const itemId = task.id;
  const category = task.category;

  const $task = `
          <article class="taskArticle" data-taskcategory="${category}">
          <lable>${itemName}</lable>
          <i  class="fa-regular fa-star"></i>
          <i  class="fa-regular fa-circle-xmark" data-taskid="${itemId}"></i>
          <i  class="fa-regular fa-folder"></i>
          </article>
          <div class="dropdown-content">
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Watch</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Eat</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Read</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">To Buy</span>
            <span class="dropdown-element" data-taskId="${itemId}" href="javascript:">Other</span>
          </div>
        `;

  let categoryMap = { 'to Watch': "#45c4b0", 'To read': '#ca06ec', 'To Eat': '#7c001d', 'To Buy': '#0109ea' };

  // for (let key in categoryMap) {
  //   if (category.includes(key)) {
  //     $task.css('border-left', `solid 5px ${categoryMap[key]}`);
  //   }
  // }
  return $task;
};
