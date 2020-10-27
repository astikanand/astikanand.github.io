# Formatting



> 1. **Headings**

# h1

## h2

### h3

#### h4

##### h5

###### h6

standard

> 2. **Emphasis**

*Italic type*
**Bold**
~~Negative~~
This is `inline` coded.
This is a link to [kodefork](https://www.kodefork.com).
Example of image ![alt](https://) .



> 3. **Fold**

Fold the long sentences.

<details><summary>Boostnote is a notepad corresponding to markdown notation, which is a tool for organizing and sharing information.</summary>
- Features - <br>
· Search function to find memos in one shot
· Supports markdown notation <br>
· Support for Mac, Windows, Linux, iOS, Android <br>
· Export and import to Plain text (.txt), Markdown (.md) format <br>
· Supports PDF saving <br>
· Can be used offline <br>
· Synchronize to dropbox etc. with setting <br>
· Supports theme colors and numerous fonts <br>
</details>



> 4. **List**

- List 1

- List 2

- List 3

  

> 5. **Link**

Put a text on the left and a url on the right.

[Go to KodeFork](https://www.kodefork.com)



> 6. **Check box**

- [x] Task 1

- [x] Task 2

  

> 7. **Quotation**

> Quotation
> Quotation Quotation



> 8. **Horizontal line**

Horizontal lines have various ways of writing.

------

------

------



> 9. **Image**

Put the title of the picture on the left and write the saved place on the right.

![Image title](https://boostnote.io/assets/img/logo.png)



> 10. **Source code**

```js
Render: function () {
  Return (
    <Div className = "commentBox">
      <H1> Comments </ h1>
      <CommentList data = {this.state.data} />
      <CommentForm onCommentSubmit = {this.handleCommentSubmit} />
    </Div>
  );
}
```



> 11. **Table**

| Fruits | Price |
| :----- | :---- |
| Apple  | 1$    |
| Grapes | 4$    |
| Orange | 2$    |
| Lemon  | 1$    |
| Peach  | 3$    |
| Melon  | 20$   |

These are the basic markdown formatting.



> 12. **Latex**

Mathematical formatting.
$$
\mathrm{e}^{\mathrm{i}\theta} = \cos(\theta) + \mathrm{i}\sin(\theta)
$$


> 13. **Flowchart**

```flowchart
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes or No?:>http://www.google.com
io=>inputoutput: catch something…
st->op1->cond
cond(yes)->io->e
cond(no)->sub1(right)->op1
```

Sequence

```sequence
Title: Here is a title
A-> B: Normal line
B -> C: Dashed line
C -> D: Open arrow
D -> A: Dashed open arrow
```