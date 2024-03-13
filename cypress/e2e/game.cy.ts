describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:8081/').wait(1000).then(() => console.log("ready!"))

    cy.get('[data-testid="qs.0"]')
      .trigger("pointerdown", { which: 1 })
      .trigger("pointermove", { force: true, clientX: 100, clientY: 200 })
      .wait(2000)
      .trigger("pointermove", { force: true, clientX: 100, clientY: 100 })
      .trigger("pointerup", { force: true })

  })
})
