//对服务器返回的评论列表进行处理，转换成符合'楼层和楼中楼'的结构
// commentList里的对象都是不可扩展的(不可逆)，也许也是冻结的，是redux内部为了确保数据的一致性进行的处理
function deepCopyObj(obj) {
	// * 深拷贝(redux中的不可变)对象
	const newObj = {};
	for (let p in obj) {
		if (typeof p !== 'object') {
			newObj[p] = obj[p];
		} else {
			newObj[p] = deepCopyObj(obj[p]); // * 是对象就建
		}
	}
	return newObj;
}

function commentListTrans(commentListIn) {
	//把commentList处理成可以直接展示的结构
	const commentList = commentListIn.map(item => deepCopyObj(item));
	// console.log('deepCopyObj', commentList)
	const commentList_1 = commentList.filter(item => item.comment_comment_id === null);
	const commentList_2 = commentList.filter(item => item.comment_comment_id !== null);

	for (let j = commentList_1.length - 1; j >= 0; j--) {
		// * 按从旧到新的顺序
		const comment = commentList_1[j]; // * 当前父评论
		const set = []; // * 当前链表节点集
		const { id } = comment;
		set.push(id);

		for (let i = commentList_2.length - 1; i >= 0; i--) {
			// * 按从旧到新的顺序
			// console.log('commentList_2', commentList_2)
			const { id: id2 } = commentList_2[i];
			const idTo = commentList_2[i].comment_comment_id;
			if (set.indexOf(idTo) !== -1) {
				// * 将匹配的评论加入到当前链表节点集
				set.push(id2);
			}
			if (idTo !== id) {
				// * 如果是回复另一条子评论的子评论，添加信息
				const commentTo = commentList_2.filter(item => item.id === idTo)[0];
				commentList_2[i].commentTo = deepCopyObj(commentTo);
			}
		}

		// * 父评论添加其子评论列表，列表中已具备回复信息
		set.shift();
		commentList_1[j].childComments = [];
		set.forEach((item, index) => {
			commentList_1[j].childComments.push(deepCopyObj(commentList_2[index])); // * 局部对象需要深拷贝，否则函数退出后指针指向undefined
		});
	}
	// commentList_1.reverse();
	return commentList_1;
}
export default commentListTrans;
