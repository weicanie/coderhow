import styled from 'styled-components';

const PictureShowWrapper = styled.div`
	display: flex-root;
	div,
	img {
		transition: all 0.75s;
	}
	.pic-containner {
		overflow: hidden;
		.first-pic,
		.pic {
			position: relative;
			/* 避免图片scale时溢出 */
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
			border: 1.5px solid #000;
			float: left;

			cursor: pointer;
		}
		.first-pic {
			width: 50%;
			height: 600px;
		}
		.pic {
			width: 25%;
			height: 300px;
		}
		.cover {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-color: black;
			opacity: 0;
		}

		&:hover {
			.cover {
				opacity: 0.3;
			}
			.first-pic:hover,
			.pic:hover {
				/* 层叠 */
				.cover {
					opacity: 0;
				}
				img {
					transform: scale(1.1);
				}
			}
		}
	}
`;
export default PictureShowWrapper;
