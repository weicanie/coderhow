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
// *把commentList处理成可以直接展示的结构
function commentListTrans(commentListIn) {
	// *通过排序解决顺序不确定的问题
	commentListIn.sort((a,b) => a.id - b.id).map(item => deepCopyObj(item));// * 按从旧到新的顺序
	const commentList = commentListIn.map(item => deepCopyObj(item));
	const commentList_1 = commentList.filter(item => item.comment_comment_id === null).sort((a,b) => a.id - b.id)
	const commentList_2 = commentList.filter(item => item.comment_comment_id !== null).sort((a,b) => a.id - b.id)
	for (let j = 0; j <= commentList_1.length - 1; j++) {
		const comment = commentList_1[j]; //  当前父评论
		const set = []; //  当前链表节点集合
		const { id } = comment;
		set.push(id);

		for (let i = 0; i <= commentList_2.length - 1; i++) {
			// console.log('commentList_2', commentList_2)
			const { id: id2 } = commentList_2[i];
			const idTo = commentList_2[i].comment_comment_id;
			if (set.indexOf(idTo) !== -1) {
				//  将匹配的评论加入到当前链表节点集
				set.push(id2);
			}
			if (idTo !== id) {
				//  如果是回复另一条子评论的子评论，添加信息
				const commentTo = commentList_2.filter(item => item.id === idTo)[0];
				commentList_2[i].commentTo = commentTo;
			}
		}

		//  父评论添加其子评论列表，列表中已具备回复信息
		set.shift();
		console.log('set', set, comment)
		commentList_1[j].childComments = [];
		set.forEach((id) => {
			commentList_2.forEach((comment) => {
				if (comment.id === id) {
					commentList_1[j].childComments.push(deepCopyObj(comment));//* 需要深拷贝
				}
			})
		});
	}
	return commentList_1;
}
export default commentListTrans;