<script>
  export let todo;
  export let removeTodo;
</script>

<main class="todo">
  <div class="todo-item">
    <span class:completed={todo.completed}>
      <input
        placeholder="Deleted todo"
        bind:value={todo.text}
        type="text"
        disabled={todo.completed}
      />
    </span>

    <button
      aria-label="Remove todo"
      on:click={() => removeTodo(todo.id)}
      class="remove"
    />
  </div>
</main>

<style>
  /**
      Define basic variables for use within component
  **/
  :root {
    --x-color: rgb(103, 103, 103);
    --x-highlight: rgb(108, 38, 38);
    --checkbox-color: rgb(108, 38, 38);
    --font-size: 24px;
    --line-height: calc(var(--font-size) * 3);
  }

  /**
      Styles for entire todo component, to make sure everything stays inline
  **/
  .todo {
    border-top: 1px solid var(--color-outline);
    box-shadow: 0 0 4px var(--color-shadow);
  }
  .todo-item {
    position: relative;
    display: flex;
    align-items: center;
  }

  /**
      Todo text box
  **/
  input[type='text'] {
    font-family: inherit;
    font-weight: 300;
    font-size: var(--font-size);
    line-height: var(--line-height);
    background-color: var(--color-bg);
    color: var(--color-text);
    border: none;
    width: 90%;
    margin-left: 40px;
  }
  input[type='text']:focus {
    outline: none;
  }
  input[type='text']:disabled {
    text-decoration: line-through;
    color: var(--x-color);
  }

  /**
      Remove button
  **/
  .remove {
    display: none;
    position: absolute;
    right: var(--font-size);
    background-color: var(--color-bg);
    font-size: calc(var(--font-size) * 2);
    color: var(--x-color);
    transition: color 0.2s ease-out;
    border: none;
  }
  .remove:hover {
    color: var(--x-highlight);
  }
  .remove:after {
    content: '×';
  }
  .todo:hover .remove {
    display: block;
  }
</style>
