const { strPreview } = require('../../../src/views/hbs-helpers/str-preview');

describe('Views | HBS Helpers | str-preview', () => {
	test('It should get preview string - shortParagraph', () => {
		const shortParagraph = 'Est sit id sit. Sit ipsum aliquam et totam.';

		expect(strPreview(shortParagraph, { hash: { previewLength: 50 } })).toEqual(
			shortParagraph
		);

		expect(strPreview(shortParagraph)).toEqual(shortParagraph);
	});

	test('It should get preview string - longParagraph', () => {
		const longParagraph =
			'Pariatur dignissimos ut quae et totam doloremque molestiae quo. Quia sunt aut consequuntur magni facilis. Optio quia repudiandae voluptatibus omnis reiciendis. Neque molestiae illo et aut explicabo doloribus modi. Quibusdam voluptate ducimus. Reiciendis dolorem consequatur aut. Nisi et vel nesciunt et in veniam quis. Fugit consequatur id enim illo aut doloremque sit. Quo autem dolorem eum illum consequuntur et. Sequi atque tenetur sit sunt. At sit neque.';

		expect(strPreview(longParagraph, { hash: { previewLength: 50 } })).toEqual(
			'Pariatur dignissimos ut quae et totam doloremque m...'
		);

		expect(strPreview(longParagraph)).toEqual(
			'Pariatur dignissimos ut quae et totam doloremque molestiae quo. Quia sunt aut consequuntur magni facilis. Optio quia repudiandae voluptatibus omnis re...'
		);
	});
});
