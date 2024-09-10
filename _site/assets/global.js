// Wrap sections in in <section> elements for easy handling
// for (let h of document.querySelectorAll(
//   'main :is(h2, h3, h4, h5, h6):not(:is(article, section, .no-section-wrapper) *)',
// )) {
//   let level = Number(h.tagName[1]);
//   let section = document.createElement('section');
//   section.id = h.id + '-section';
//   let next = h.nextSibling;
//   h.before(section);
//   section.append(h);

//   do {
//     let headingLevel = next.nodeName?.match(/^h([1-6])?$/i)?.[1];

//     if (headingLevel <= level) {
//       // We’ve found the next section
//       break;
//     }

//     let previousNext = next;
//     next = next.nextSibling;
//     section.append(previousNext);
//   } while (next);
// }

// let navLinks = document.querySelectorAll(
//   '#site-nav > .nav-list > .nav-list-item',
// );

// navLinks[4]?.classList.add('active');
// navLinks[7]?.classList.add('active');

// Lets images get smaller
for (let img of document.querySelectorAll('#main-content img')) {
  let updated = updateIntrinsicDimensions(img);

  if (!updated) {
    // Perhaps image has not loaded
    img.addEventListener('load', () => {
      updateIntrinsicDimensions(img);
    });
  }
}

function updateIntrinsicDimensions(img) {
  let { naturalWidth, naturalHeight } = img;

  if (naturalWidth === 0 || naturalHeight === 0) {
    return false;
  }

  img.style.setProperty('--natural-width', naturalWidth);
  img.style.setProperty('--natural-height', naturalHeight);

  let figure = img.closest('figure');

  if (
    !img.classList.contains('no-link') &&
    figure &&
    (naturalWidth > img.offsetWidth / 4 || naturalHeight > img.offsetHeight / 4)
  ) {
    // Wrap with link to full-size image
    let a = document.createElement('a');
    a.href = img.src;
    a.target = '_blank';
    img.replaceWith(a);
    a.append(img);
  }

  return true;
}
