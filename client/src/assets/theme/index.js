const theme = {
	color: {
		primaryColor: '#ff385c',
		secondaryColor: '#00848A'
	},
	text: {
		primaryColor: '#484848',
		secondaryColor: '#222'
	},
	mixin: {
		boxShadow: `&:hover {
      transition:box-shadow 0.25s ;
      box-shadow: 0 2px 4px rgba(0,0,0,.18);
    }`,
		homeSectionWidthAndMargin: `
      width:1032px;
      margin:0px auto;
    `,
		textEllipsis: `
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    `
	}
};

export default theme;
